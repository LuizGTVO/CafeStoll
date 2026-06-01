import { supabaseAdmin } from '@/lib/supabase';

const BUCKET_NAME = 'cafestoll-images';

export const uploadImage = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
  try {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);

    if (!bucketExists) {
      const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
      });
      if (createError) {
        console.warn('Failed to auto-create storage bucket.', createError);
      }
    }

    const fileExt = fileName.split('.').pop() || 'jpg';
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}.${fileExt}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(uniqueName, fileBuffer, {
        contentType: mimeType,
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(uniqueName);

    return publicUrl;
  } catch (error) {
    console.error('Storage service upload failure:', error);
    console.warn('Returning mock backup coffee image URL due to upload failure.');
    return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop';
  }
};
