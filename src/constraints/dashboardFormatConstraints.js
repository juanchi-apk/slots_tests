export const injectColor = (userArray)=>{
    for (let i=0 ; i<userArray.length; i++){
        if(userArray[i].id % 2 === 0){
        userArray[i].colorClass ="table-secondary"
        }else{
         userArray[i].colorClass ="table-active"
         userArray[i].alignCenter = "align-middle"
        }
    }
 return userArray
}

export const dataPagination = (totalusers, userperpage)=>{
                let pagearray = []
                let totalpages =totalusers/userperpage
                for (let x=1;x<=totalpages;x++ ){
                    pagearray.push(x)
                }

    return pagearray
}