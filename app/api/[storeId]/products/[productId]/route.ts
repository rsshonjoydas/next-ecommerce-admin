import { auth } from '@clerk/nextjs';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

// Configure Cloudinary using environment variables or other methods as described in previous responses.
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    // Fetch the product to get the associated image URLs
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      select: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    // Delete the Cloudinary images
    if (product.images && product.images.length > 0) {
      const imageUrls = product.images.map((image) => image.url);

      for (const imageUrl of imageUrls) {
        // Extract the public_id from the Cloudinary URL
        const matchResult = imageUrl.match(/\/v\d+\/([^/]+)\./);
        if (matchResult) {
          const publicId = matchResult[1];

          // Delete the image from Cloudinary
          await cloudinary.uploader.destroy(publicId);
        }
      }
    }

    // Delete the product from the database
    const deletedProduct = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      images,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    if (!colorId) {
      return new NextResponse('Color id is required', { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse('Size id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    // Fetch the product to get the associated image URLs
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      select: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    // Delete the Cloudinary images
    if (product.images && product.images.length > 0) {
      const imageUrls = product.images.map((image) => image.url);

      for (const imageUrl of imageUrls) {
        // Extract the public_id from the Cloudinary URL
        const matchResult = imageUrl.match(/\/v\d+\/([^/]+)\./);
        if (matchResult) {
          const publicId = matchResult[1];

          // Delete the image from Cloudinary
          await cloudinary.uploader.destroy(publicId);
        }
      }
    }

    // Update the product with new data and images
    const updatedProduct = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
