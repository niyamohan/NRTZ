import { z } from 'zod';

// スキーマ
export const PatientSchemas = z.object({
  id: z.number().nonnegative({ message: '患者IDは正の整数である必要があります。' }), 
  name: z.string().nonempty({ message: '名前は必須項目です。' }),
  updatedAt: z.number(), // updatedAt フィールドを追加する
});

// type
export type Patient = z.infer<typeof PatientSchemas>;