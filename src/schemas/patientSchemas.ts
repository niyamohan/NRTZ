import { z } from 'zod';

// 病人スキーマ
export const PatientSchemas = z.object({
  id: z.number().nonnegative({ message: '患者IDは正の整数である必要があります。' }), // 数字类型
  name: z.string().nonempty({ message: '名前は必須項目です。' }),
});

// type 病人
export type Patient = z.infer<typeof PatientSchemas>;