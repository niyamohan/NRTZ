'use server'

import { accountsDb } from "@/db/accountDataAccess";
import { commentsDb } from "@/db/commentDataAccess";
import { patientsDb } from "@/db/patientDataAccess";
import { AccountSchema } from "@/models/Account";


// -------------------------------------ACTION查询所有账户start-------------------------------------
export async function getAllAccountsAction() {
    'use server'

    const accounts = await accountsDb.findMany()
    if (!accounts || accounts.length === 0) {
        return {
            error: 'アカウントが見つかりません',
        }
    }

    return {
        success: true,
        accounts,
    }
}
// -------------------------------------ACTION查询所有账户end-------------------------------------


// -------------------------------------ACTION查询所有病人start-------------------------------------
export async function getAllPatientsAction() {
    'use server'

    const patients = await patientsDb.findAll()
    if (!patients || patients.length === 0) {
        return {
            error: '病人が見つかりません',
        }
    }

    return {
        success: true,
        patients,
    }
}
// -------------------------------------ACTION查询所有病人end----------------------------------------------

// -------------------------------------ACTION 查询所有评论 start -------------------------------------
export async function getAllCommentsByPatientIdAction(patientId: string) {
    'use server'

    const commentsData = await commentsDb.findManyByPatientId(Number(patientId)); // パラメータの型変換
    if (!commentsData || commentsData.comments.length === 0) {
        return {
            error: 'コメントが見つかりません',
        };
    }

    return {
        success: true,
        patient: commentsData.patient,
        comments: commentsData.comments,
    };
}
// -------------------------------------ACTION 查询所有评论 end -----------------------------------------

// -------------------------------------ACTION 删除评论 start -------------------------------------
export async function deleteCommentAction(commentId: number) {
    'use server'

    try {
        const deletedCommentId = await commentsDb.deleteComment(Number(commentId)); // パラメータの型変換
        if (deletedCommentId === undefined) { // 修正点: 削除されたコメント ID が undefined ならエラー
            return {
                error: 'コメントが削除されませんでした',
            };
        }

        return {
            success: true,
            message: 'コメントが削除されました',
            commentId: deletedCommentId, // 削除されたコメント ID を返す
        };
    } catch (error) {
        console.error(error);
        return {
            error: 'コメントの削除に失敗しました',
        };
    }
}
// -------------------------------------ACTION 删除评论 end -----------------------------------------

// -------------------------------------ACTION 更新评论 start -------------------------------------
export async function updateCommentAction(commentId: number, newContent: string) {
    'use server'

    try {
        const updatedComment = await commentsDb.updateComment(commentId, newContent); // パラメータの型変換

        if (!updatedComment) {
            return {
                error: 'コメントが更新されませんでした',
            };
        }

        return {
            success: true,
            message: 'コメントが更新されました',
            updatedComment,
        };
    } catch (error) {
        console.error(error);
        return {
            error: 'コメントの更新に失敗しました',
        };
    }
}
// -------------------------------------ACTION 更新コメント end -----------------------------------------

// -------------------------------------ACTION コメント追加 start -------------------------------------
export async function addCommentAction(content: string, patientId: number, accountId: number, accountName: string) {
    'use server';
  
    try {
      const newComment = await commentsDb.addComment(content, patientId, accountId, accountName);
  
      return {
        success: true,
        message: 'コメントが追加されました',
        comment: newComment,
      };
    } catch (error) {
      console.error(error);
      return {
        error: 'コメントの追加に失敗しました',
      };
    }
  }
  // -------------------------------------ACTION コメント追加 end -------------------------------------