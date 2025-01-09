'use server'

import { accountsDb } from "@/db/accountDataAccess";
import { commentsDb } from "@/db/commentDataAccess";
import { patientsDb } from "@/db/patientDataAccess";

// -------------------------------------ACTIONすべてのアカウントを取得開始-------------------------------------
export async function getAllAccountsAction() {
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
// -------------------------------------ACTIONすべてのアカウントを取得終了-------------------------------------

// -------------------------------------ACTIONすべての患者を取得開始-------------------------------------
export async function getAllPatientsAction() {
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
// -------------------------------------ACTIONすべての患者を取得終了----------------------------------------------

// -------------------------------------ACTION すべてのコメントを取得開始 -------------------------------------
export async function getAllCommentsByPatientIdAction(patientId: string) {

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
// -------------------------------------ACTION すべてのコメントを取得終了 -----------------------------------------

// -------------------------------------ACTION コメント削除開始 -------------------------------------
export async function deleteCommentAction(commentId: number) {
    try {
        await commentsDb.deleteComment(Number(commentId)); // パラメータの型変換
        return {
            success: true,
            message: 'コメントが削除されました'
        };
    } catch (error) {
        console.error(error);
        return {
            error: 'コメントの削除に失敗しました',
        };
    }
}
// -------------------------------------ACTION コメント削除終了 -----------------------------------------

// -------------------------------------ACTION コメント更新開始 -------------------------------------
export async function updateCommentAction(commentId: number, newContent: string) {
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
// -------------------------------------ACTION コメント更新終了 -----------------------------------------

// -------------------------------------ACTION コメント追加開始 -------------------------------------
export async function addCommentAction(content: string, patientId: number, accountId: number, accountName: string) {
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
// -------------------------------------ACTION コメント追加終了 -------------------------------------