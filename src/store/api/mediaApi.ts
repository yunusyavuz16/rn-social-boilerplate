import {baseApi} from './baseApi';
import {mediaService} from '@services/mediaService';
import {transformMediaItem} from '@utils/transformers';
import type {MediaItem} from '../../types/post.types';

interface SearchMediaParams {
  query: string;
}

/**
 * Media API slice with RTK Query
 * Handles media fetching and searching
 */
export const mediaApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    /**
     * Get all media items
     */
    getMedia: builder.query<MediaItem[], void>({
      queryFn: async () => {
        try {
          const media = await mediaService.getMedia();
          return {
            data: media.map(transformMediaItem),
          };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Failed to fetch media',
            },
          };
        }
      },
      providesTags: ['Media'],
      keepUnusedDataFor: 300,
    }),

    /**
     * Search media by query
     */
    searchMedia: builder.query<MediaItem[], SearchMediaParams>({
      queryFn: async ({query}) => {
        try {
          const media = await mediaService.searchMedia(query);
          return {
            data: media.map(transformMediaItem),
          };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: error instanceof Error ? error.message : 'Search failed',
            },
          };
        }
      },
      providesTags: ['Media'],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useGetMediaQuery,
  useLazyGetMediaQuery,
  useSearchMediaQuery,
  useLazySearchMediaQuery,
} = mediaApi;

