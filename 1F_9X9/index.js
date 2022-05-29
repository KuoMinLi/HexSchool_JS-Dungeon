const callist = document.querySelector("#target");
str= `<div class="title">
        <div class="label-up">
            <div class="label-up-left">×</div>
            <div class="label-up-mid"></div>
            <div class="label-up-right">×</div>
        </div>
        <div class="title-Name">
            <div class="title-Name-Chinese">九九乘法表</div>
            <div class="title-Name-English">MULTIPLICATION CHART</div>
        </div>
        <div class="label-down">
            <div class="label-down-left">×</div>
            <div class="label-down-mid"></div>
            <div class="label-down-right">×</div>
        </div>
      </div>`;
const data = [];




for(let round=2; round<10; round++){
  content= ``
  for (let item=1; item<10; item++){
    content+= `<div class="cal-content">${round} × ${item} ＝ ${(item*round)}</div>`; 
  }
  str+=`<div class="cal" >
          <div class="cal-container">
          <div class="cal-title">${round}</div>
          ${content}
          </div>
        </div>`
}

callist.innerHTML= str ;



