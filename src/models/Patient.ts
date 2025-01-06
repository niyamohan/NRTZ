import { z } from 'zod';

// 患者数据的 Schema
export const PatientSchema = z.object({
  id: z.number(), // 患者 ID，数字类型
  name: z.string(), // 患者名称，字符串类型
});

// 底部组件 Props 数据的 Schema
export const PatientDetailsPropsSchema = z.object({
  patientId: z.string(), // 患者 ID，字符串类型
});