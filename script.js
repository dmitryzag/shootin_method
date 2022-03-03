new Chartist.Line('.ct-chart', {
  labels: [],
  series: []
}, {
  fullWidth: true,
  chartPadding: {
    right: 40
  }
});
const start = document.querySelector("#start");

const rFun = (x,y,dy) =>{
  return -2 * dy + y /x + 3; 
};

let fRunge = (x,y,dy,h) => {
  let K1 = h * rFun(x,y,dy);
  let K2 = h * rFun(x + h / 2, y + h / 2 * dy + h / 8 * K1, dy + K1 / 2);
  let K3 = h * rFun(x + h / 2, y + h / 2 * dy + h / 8 * K2, dy + K2 / 2);
  let K4 = h * rFun(x + h, y + h * dy + h / 2* K3, dy + K3);
    
  y = y + h * dy + 1 / 6 * (K1 + K2 + K3);
  dy = dy + 1 / 6 * (K1 + 2 * K2 + 2 * K3 + K4);

  return [y,dy];
};

const mShooting = (a, b, n, c, epsilon, B, A) => {
  let step = (b-a) / n;
  let points = [];
  points[0] = new Array(n+1); // x
  points[1] = new Array(n+1); // y
  
  for(let i = 0; i < points[0].length; i++){
    points[0][i] = a + i * step; 
  }
  do{
    let y = A;
    let dy = c;

    points[1][0] = A;

    for(let i = 1; i < points[0].length;i++){
      [y,dy] = fRunge(points[0][i - 1],y,dy,step);
      points[1][i] = y;
    }

    if(points[1][points[0].length - 1] < B){
      c += epsilon;
    }else{
      c -= epsilon;
    }
  } while(Math.abs(points[1][points[1].length - 1] - B) >= epsilon);
  return points;
};

start.addEventListener('click', ()=>{
  const node = Number(document.querySelector("#node").value);
  const epsilon = Number(document.querySelector("#epsilon").value);
  const angle = Number(document.querySelector("#angle").value);
  let points = mShooting(0.2,0.5,node, angle,epsilon,1,2);
  console.log(points);

  new Chartist.Line('.ct-chart', {
    labels: points[0],
    series: [points[1]]
  }, {
    fullWidth: true,
    chartPadding: {
      right: 40
    }
  });
}
);

