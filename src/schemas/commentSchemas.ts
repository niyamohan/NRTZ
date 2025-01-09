import { z } from 'zod';

// コメントスキーマ
export const CommentSchemas = z.object({
  id: z.number().nonnegative({ message: 'コメントIDは正の整数である必要があります。' }), 
  content: z.string().nonempty({ message: 'コメントは必須項目です。' }),
  patientId: z.number().nonnegative({ message: '患者IDは正の整数である必要があります。' }),
  accountId: z.number().nonnegative({ message: 'アカウントIDは正の整数である必要があります。' }),
  accountName: z.string().nonempty({ message: 'アカウント名は必須項目です。' }),
  createdAt: z.string().nonempty({ message: '作成日時は必須項目です。' }),
  updatedAt: z.string().nonempty({ message: '更新日時は必須項目です。' }),
});

// type コメント
export type Comment = z.infer<typeof CommentSchemas>;