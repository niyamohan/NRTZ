import { z } from 'zod';

// アカウントスキーマ
export const AccountSchemas = z.object({
  id: z.number().nonnegative({ message: 'ユーザーIDは正の整数である必要があります。' }),
  name: z.string().nonempty({ message: '名前は必須項目です。' }),
});

// type アカウント
export type Account = z.infer<typeof AccountSchemas>;