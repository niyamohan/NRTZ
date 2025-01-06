import { fakeDb } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // 确保 params 已经被正确处理，等待它
    const { id } = await params; // 等待 params

    // 获取患者 ID
    const patientId = Number(id); // 转换为数字

    // 如果 patientId 无效
    if (isNaN(patientId)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid patient ID' }),
        { status: 400 }
      );
    }

    // 根据 patientId 获取患者信息
    const patients = fakeDb.getPatientsByPatientId(patientId);

    return new Response(JSON.stringify(patients), { status: 200 });
  } catch (error) {
    console.error('Error fetching patient details:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to fetch patient details' }),
      { status: 500 }
    );
  }
}