





export function accountResponseSuccess(token,user){

    return {code:200 , access_token:token,success:true , username:user.username , userType:user.userType}
}

export function accountResponseFailed(message){

return {code:401 , sucess:false , message:message }

}