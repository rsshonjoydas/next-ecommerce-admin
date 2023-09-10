import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configure Cloudinary using environment variables or other methods as described in previous responses.
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

async function getStoreByUserId(storeId: string, userId: string) {
  return await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });
}

async function getBillboardById(billboardId: string) {
  return await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });
}

function extractPublicIdFromImageUrl(imageUrl: string) {
  const matchResult = imageUrl.match(/\/v\d+\/([^/]+)\./);
  return matchResult?.[1];
}

async function deleteImageFromCloudinary(imageUrl: string) {
  try {
    const publicId = extractPublicIdFromImageUrl(imageUrl);

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const billboard = await getBillboardById(params.billboardId);

    if (!billboard) {
      return new NextResponse('Billboard not found', { status: 404 });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.error('[BILLBOARD_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const storeByUserId = await getStoreByUserId(params.storeId, userId);

    if (!storeByUserId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    // Fetch the previous billboard data
    const previousBillboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    if (!previousBillboard) {
      return new NextResponse('Billboard not found', { status: 404 });
    }

    // Extract the public_id from the previous image URL
    const previousPublicId = extractPublicIdFromImageUrl(
      previousBillboard.imageUrl
    );

    // Delete the previous image from Cloudinary if a public ID is available
    if (previousPublicId) {
      await cloudinary.uploader.destroy(previousPublicId);
    }

    // Update the billboard with the new image URL
    await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return new NextResponse('Billboard updated successfully', { status: 200 });
  } catch (error) {
    console.error('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const storeByUserId = await getStoreByUserId(params.storeId, userId);

    if (!storeByUserId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const billboard = await getBillboardById(params.billboardId);

    if (!billboard) {
      return new NextResponse('Billboard not found', { status: 404 });
    }

    await deleteImageFromCloudinary(billboard.imageUrl);

    await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return new NextResponse('Billboard and image deleted successfully', {
      status: 200,
    });
  } catch (error) {
    console.error('[BILLBOARD_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
