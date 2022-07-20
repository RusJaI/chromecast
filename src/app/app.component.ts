import { Component } from '@angular/core';
import { ScreenModel } from './pages/screenmodel';
import { PosserviceService } from './posservice.service';
import { ScreenserviceService } from './screenservice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  screen_list :ScreenModel []=[]
  categoryList:any[]=[];
  productList:any[]=[];
  title = 'angular-web';
  screenwithdata:any[]=[];
  productcount_map = new Map();
  screendata_map=new Map();
  currentYear = new Date().getFullYear();
  
  constructor(screenService:ScreenserviceService,posService:PosserviceService){

    screenService.getScreens().subscribe((scrn:ScreenModel[]) =>{
      this.screen_list=scrn;
    });

    this.screenwithdata=this.screen_list;

    posService.getSelectedCategories().subscribe((ctg:any[]) =>{
      this.categoryList=ctg;
    });
    
    //console.log("Prod : ",this.categoryList);

    this.categoryList.forEach(catg=>{
      posService.getProductsForCategory(catg.productCategoryId).subscribe((prd:any[])=>{
      if(prd!=null){
        this.productcount_map.set(catg.productCategoryId,prd.length);
      }
      this.productList.push(prd);
      });
    });
    
    console.log("Product List : ",this.productcount_map);

  /*  var catgrows,nrows,diffrows,nextstartrow=0,i=0;

    this.categoryList.forEach(catg=>{

       catgrows=this.productcount_map.get(catg.productCategoryId);

       for (i < this.screen_list.length; i++;) {

        nrows=Math.round((this.screen_list[i].screen_height)/50);
        diffrows=catgrows-nrows;
        if(diffrows=0){
          this.screendata_map.set(this.screen_list[i].id,[nextstartrow,nrows]);
          nextstartrow=0;
          break;
        }
        else if(diffrows<0 ){ //more space left 
          this.screendata_map.set(this.screen_list[i].id,[i,catgrows]);
          nextstartrow=nrows+diffrows //diff is a negative value
          i--;
          break;

        }
        else if(diffrows>0){ //next screen also displays same category
          this.screendata_map.set(this.screen_list[i].id,[nextstartrow,nrows]);
          nextstartrow=0;
          continue;
        }
       }

       console.log("screen data map ",this.screendata_map)
    });
  */
  }

}

