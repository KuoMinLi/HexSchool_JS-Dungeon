const Datalist = document.querySelector("section");
const Locationlist =document.querySelector("select");
const select = document.querySelector('.county');
const Site = document.querySelector("aside");
const Title =document.querySelector(".gap");


const url = "https://data.epa.gov.tw/api/v1/aqx_p_432?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&sort=ImportDate%20desc&format=json";
const productsList = document.querySelector(".showList");
let data = [];

function getData() {
  axios.get(url).then(function (response) {
    let result = response.data.records;
    CreateSelect(result);
    ClickCounty(result);
    NewLoad(result);
    LocationRender(result)
   
    
    
    });

}
getData();

//初始進入畫面(預設臺北市)
function NewLoad(data){
  let SiteData = data.filter(item => item.County === "臺北市");
  SiteRender(SiteData);
  locatione();
};




function locatione(){ 
  const chi = document.querySelector(".information:first-child");
  let id = parseInt(chi.closest(".information").dataset.id);
  // console.log(id);
  // console.log(chi);
  // let el = document.getElementByClassName(".information");
  // console.log(el);
  
  
}






//取得地區列表選單
function CreateSelect(data){
  let County = data.map(item => item.County) ;
  let location=County.filter((item, index) => County.indexOf(item) === index);
  let txt=`<option value="請選擇地區">請選擇地區</option>`;
  location.forEach((item)=>{
    txt += `<option value="${item}">${item}</option>`;
  });
  Locationlist.innerHTML =txt;
}

//點擊地區
function ClickCounty(data){
  select.addEventListener("change",(e) => {
    e.stopPropagation();
    let SiteData = data.filter(item => item.County === e.target.value);
        
    Datalist.innerHTML= color(SiteData);
    // console.log(SiteData);

    LocationRender(SiteData);
    

  },false);
};                    

//渲染右邊測站數值
function SiteRender(arr){
  let str ="";
  arr.forEach(item=>{
        let id= "";
        if (Number(item.AQI)>0 && Number(item.AQI)<=50){
            id ="level1";
        } else if (Number(item.AQI)>50 && Number(item.AQI)<=100){
            id ="level2";
        }else if (Number(item.AQI)>100 && Number(item.AQI)<=150){
            id ="level3";
        }else if (Number(item.AQI)>150 && Number(item.AQI)<=200){
            id ="level4";
        }else if (Number(item.AQI)>200 && Number(item.AQI)<=300){
            id ="level5";
        }else if (Number(item.AQI)>300 && Number(item.AQI)<=400){
            id ="level6";
        }else{
            console('error!');
        };
        str += `<div class="information" data-id="${item.SiteId}">
                <div class="location">${item.SiteName}</div>
                <div class="aqi_num" id="${id}">${item.AQI}</div>
                </div>`;
    })
    Datalist.innerHTML =str;
    
   
};


function color(arr){
  let str ="";
  arr.forEach(item=>{
        let id= "";
        if (Number(item.AQI)>0 && Number(item.AQI)<=50){
            id ="level1";
        } else if (Number(item.AQI)>50 && Number(item.AQI)<=100){
            id ="level2";
        }else if (Number(item.AQI)>100 && Number(item.AQI)<=150){
            id ="level3";
        }else if (Number(item.AQI)>150 && Number(item.AQI)<=200){
            id ="level4";
        }else if (Number(item.AQI)>200 && Number(item.AQI)<=300){
            id ="level5";
        }else if (Number(item.AQI)>300 && Number(item.AQI)<=400){
            id ="level6";
        }else{
            console('error!');
        };
        str += `<div class="information" data-id="${item.SiteId}">
                <div class="location">${item.SiteName}</div>
                <div class="aqi_num" id="${id}">${item.AQI}</div>
                </div>`;
    })
    return str;
};




function title(arr){
  let str ="";
  arr.forEach(item=>{
    str += `<div class="gap">
              <h1>${item.County}</h1>
              <div class="border"></div>
              <div class="time">${item.PublishTime} 更新</div>
            </div>`
  });
  Title.innerHTML =str;
};





function LocationRender(data){
  let Chick = document.querySelector(".information:first-child");
  // let siteid = Chick.closest(".information").dataset.id;
  console.log(Chick);
  let siteid = Chick.dataset.id;
  let site = data.filter(item =>item.SiteId === siteid );
  title(site);
  let str = "";
  site.forEach((item)=>{
    str += `<ul class="container">
                <li class="compound">
                    <div class="compound_name">
                        <div class="compound_Chinese">臭氧</div>
                        <div class="compound_English">O3 (ppb)</div>
                    </div>
                    <div class="compound_num">${item.O3}</div>
                </li>
                <li class="compound">
                    <div class="compound_name">
                        <div class="compound_Chinese">懸浮微粒</div>
                        <div class="compound_English">PM10 (μg/m³))</div>
                    </div>
                    <div class="compound_num">${item.PM10}</div>
                </li>
                <li class="compound">
                    <div class="compound_name">
                        <div class="compound_Chinese">細懸浮微粒</div>
                        <div class="compound_English">PM2.5 (μg/m³)</div>
                    </div>
                    <div class="compound_num">${item["PM2.5"]}</div>
                </li>
                <li class="compound">
                    <div class="compound_name">
                        <div class="compound_Chinese">一氧化碳</div>
                        <div class="compound_English">CO (ppm)</div>
                    </div>
                    <div class="compound_num">${item.CO}</div>
                </li>
                <li class="compound">
                    <div class="compound_name">
                        <div class="compound_Chinese">二氧化硫</div>
                        <div class="compound_English">SO2 (ppb)</div>
                    </div>
                    <div class="compound_num">${item.SO2}</div>
                </li>
                <li class="compound">
                    <div class="compound_name">
                        <div class="compound_Chinese">二氧化氮</div>
                        <div class="compound_English">NO2 (ppb)</div>
                    </div>
                    <div class="compound_num">${item.NO2}</div>
                </li>
            </ul>`;
  });
  const information = color(site);
  let Content =`<aside>
            ${information}
            ${str}
           </aside>`;
  Site.innerHTML =Content;
  
}

