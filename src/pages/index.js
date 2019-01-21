import Redirect from 'umi/redirect';
export default function() {
  if(localStorage.getItem('userInfo')){
    let userInfo=JSON.parse(localStorage.getItem('userInfo'))
    let menus=userInfo.menus
    if(menus[0].url !== ''){
      return (
        <Redirect  to={menus[0].url}></Redirect>    
      );
    }else{
      return (
        <Redirect  to={menus[0].subMenus[0].url}></Redirect>    
      );      
    }
  }
  return null
}
