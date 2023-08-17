import {
  GetListArticles,
  IArticlePayload,
  UpdateArticle,
} from "@/services/article/interfaces";
import { create, detail, list, update } from "../../services/article/api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const articleQueryKeys = {
  ARTICLE_LIST: "ARTICLE_LIST",
  ARTICLE_DETAIL: "ARTICLE_DETAIL",
};

export const useInfiniteArticleQuery = (params?: GetListArticles) => {
  const { data, ...restResult } = useInfiniteQuery({
    queryKey: [articleQueryKeys.ARTICLE_LIST, params],
    queryFn: ({ pageParam = 1 }) =>
      list({
        page: pageParam,
        perPage: params?.perPage || 10,
        textSearch: params?.textSearch || undefined,
      }),
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage;
      const nextPage = page + 1;
      return page < totalPages ? nextPage : undefined;
    },
  });

  const allData = [];

  if (data) {
    for (const item of data.pages) {
      allData.push(...item.docs);
    }
  }

  return {
    data: allData,
    ...restResult,
  };
};

export const useCreateArticle = () =>
  useMutation({
    mutationFn: (payload: IArticlePayload) => create(payload),
  });

export const useArticleDetail = (id: string) =>
  useQuery({
    queryKey: [articleQueryKeys.ARTICLE_DETAIL, id],
    queryFn: () => detail(id),
    enabled: !!id,
  });

export const useUpdateArticle = () =>
  useMutation({
    mutationFn: ({ id, payload }: UpdateArticle) => update({ id, payload }),
  });
