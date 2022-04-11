const pins=[]
const detail=40

mousePressed=()=>{
  pins.push({
    x:mouseX,
    y:mouseY,
    speed:random(1,2)
  })
}

setup=()=>{
  createCanvas(1200,520)
  for(let i=5;i--;){
    pins.push({
      x:random(100,width-100),
      y:random(100,height-100),
      speed:random(1,2)
    })
  }
}

draw=()=> {
  background('black')
  stroke('white')
  noFill()
  
  let grid=[]
  for (let j=detail;j--;) {
    grid[j]=[]
    const x=map(j,0,detail,100,width-100)
    for (let i=detail;i--;) {
      const y=map(i,0,detail,100,height-100)
      grid[j][i]=mark(x,y)
    }
  }
  
  for(const k of [0,1]){
    for (let j=detail;j--;) {
      beginShape()
      for (let i=detail;i--;) {
        const position=k?grid[i][j]:grid[j][i]
        if(position){
          const [x,y]=position
          curveVertex(x,y)
        }else{
          endShape()
          beginShape()
        }
      }
      endShape()
    }
  }
  pins.forEach(P=>{with(P)y=(y+speed)%height})
}

mark=(x,y)=> {
  let dxSum=0
	let	dySum=0
  for(const P of pins){
    const dx=x-P.x
    const dy=y-P.y
    const distance=dx**2+dy**2
    dxSum+=dx/distance
    dySum+=dy/distance
  }
  if(dxSum**2+dySum**2>.003)return false  
  const influence=1600
  return [x+dxSum*influence,y+dySum*influence]
}