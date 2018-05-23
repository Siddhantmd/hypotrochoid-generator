
function sv(){
	saveCanvas("Hypotrochoid","jpg")
}
function fnumpet(d){
  
    if (d==0.5){
      denlow=1
    }
    else{
      var len=d.toString().length-2
      var b=Math.pow(10,len)
      var a=d*b
	  var ax=parseInt(a.toFixed(0))
        for (h=ax;h>0;h--){
          if (ax%h===0 && b%h===0) {
            var hcf= h
            var denlow=b/hcf
            break;
          }
        }
    }
  
  return denlow
  }  
function lowest(y,z){
	for (h=y;h>0;h--){
          if (y%h===0 && z%h===0) {
            var hcf= h
            var lowz=z/hcf
			var lowy=y/hcf
            break;
	      }
	}
	low=[lowy,lowz]
	return low
}
 
  function setup() {
  
 var canvas = createCanvas(windowHeight,windowHeight)
 canvas.parent('sketch-holder');
  var submitbutton=select('#submit')
  submitbutton.mousePressed(reset);
  reset()
  
  var submitbutton2=select('#submit2')
  submitbutton2.mousePressed(reset2)
  
  var savec=select('#savec')
  savec.mousePressed(sv)
 
  }
  
function reset2(){
	
  var bgcol=select('#bg');
  background(bgcol.value())
  
  var strokeweight=select('#strokeweight');
  
  var strokecol=select('#strokecol');
  
  
  var rot=0
  var rotb=Math.PI
  
  var inputradtot=select('#radtot')
  radtot= parseFloat(inputradtot.value())

  var input=select('#radc');
  radctemp=parseFloat(input.value())
  radc=(parseFloat(input.value()))*radtot;
  
  var smalltowholetemp=select('#smalltowhole');
  
  var pos = smalltowholetemp.value().search("/")
	if (pos!=-1){
	arr=smalltowholetemp.value().split("/"); 
	smalltowholex=parseInt(arr[0])/parseInt(arr[1])
	smalltowhole=smalltowholex
	numpet=lowest(parseInt(arr[0]),parseInt(arr[1]))
	}
	else {smalltowhole=parseFloat(smalltowholetemp.value())
	numpet=fnumpet(smalltowhole)
	}
  
  // smalltowhole=parseFloat(smalltowholetemp.value());
  
  var radb=radtot*smalltowhole // the radius of smaller circle(figured out acc. to the ratio smalltowhole)
  var rada=radtot-radb		   // the distance from center of the smaller circle to center of larger circle
  
  var comp=select('#comp')
  var completeness=parseFloat(comp.value())
  
  var grain=select('#grain')
  var graininess=1/(parseFloat(grain.value())*low[0])
  
  
  var xcen=windowHeight/2
  var ycen=windowHeight/2
  ratio=1/smalltowhole
  // var temp=20*numpet*(radc+0.5)
  
	  // the following lines for background figures
	  push()
	  noFill()
	  stroke(150,150,150,60)
	  ellipse(xcen,ycen,2*radtot)
	  ellipse(xcen+radtot-radb,ycen,2*radb)
	  push()
		  strokeWeight(8)
		  point(xcen+radtot-radb,ycen)
	  pop()
	  line(xcen+radtot-radb,ycen,xcen+radtot-radb+radc,ycen)
	  line(xcen,ycen,xcen,ycen+radtot)
	  push()
		  strokeWeight(8)
		  point(xcen,ycen)
	  pop()
	  // the code for background figures ends here
  
  var temp=280*low[1]*(radctemp+0.4)*radtot/100*graininess
  
  // text("Small to whole: "+smalltowhole,100,140)
  // text("Number of Petals: "+numpet,100,120)
  // text("temp: "+temp,400,400)
  
  // Here begins the main code, that is doing the drawing
  for (x=0;x<low[0]*completeness*temp;x++){ // here , 1000 needs to be multiplied with numof pet 
	var xcen=windowHeight/2
	var ycen=windowHeight/2
	  push()
		  strokeWeight(strokeweight.value())
		  stroke(strokecol.value())
		  translate(xcen,ycen)
			rotate(rot)
				translate(rada,0)
					rotate(rotb)
					point(radc,0)
	  pop()
	  
	rot=rot-(2*Math.PI)/temp	// minus since revolution is clockwise and rotation is anticlockwise. This also needs to take into account, the no. of pet, it seems
	rotb=rotb+(ratio*2*Math.PI)/temp 	// the greater the denominator, the smoother the line
}
}

function reset(){
  
  var bgcol=select('#bg');
  background(bgcol.value())
  
  var strokeweight=select('#strokeweight');
  
  var strokecol=select('#strokecol');
  
  var rot=0
  var rotb=Math.PI
  var inputradtot=select('#radtot')
  radtot=parseFloat(inputradtot.value())

  var input=select('#radc');
  radctemp=parseFloat(input.value());
  radc=(parseFloat(input.value()))*radtot;
  
  var numofpet=select('#numofpet');
  smalltowhole=1/parseFloat(numofpet.value());
  numpet=parseFloat(numofpet.value())
  
  
  smalltowhole=1/parseFloat(numofpet.value());
  numpet=parseFloat(numofpet.value())
  
  var comp=select('#comp')
  var completeness=parseFloat(comp.value())
  
  var grain=select('#grain')
  var graininess=1/parseFloat(grain.value())
  
  // var comp=select('#comp')
  // completeness= (parseFloat(comp.value()))*numpet
  
  var radb=radtot*smalltowhole // the radius of smaller circle(figured out acc. to the ratio smalltowhole)
  var rada=radtot-radb		 // the distance from center of the smaller circle to center of larger circle
 
  
  
  var xcen=windowHeight/2
  var ycen=windowHeight/2
  ratio=1/smalltowhole
  var temp=280*numpet*(radctemp+0.4)*radtot/100*graininess
 
  
	  // the following lines for background figures
	  push()
	  noFill()
	  stroke(150,150,150,60)
	  ellipse(xcen,ycen,2*radtot)
	  ellipse(xcen+radtot-radb,ycen,2*radb)
	  push()
		  strokeWeight(8)
		  point(xcen+radtot-radb,ycen)
	  pop()
	  line(xcen+radtot-radb,ycen,xcen+radtot-radb+radc,ycen)
	  line(xcen,ycen,xcen,ycen+radtot)
	  push()
		  strokeWeight(8)
		  point(xcen,ycen)
	  pop()
	 
	  // the code for background figures ends here
  
  // Here begins the main code, that is doing the drawing
  for (x=0;x<completeness*temp;x++){ // here , 1000 needs to be multiplied with numof pet 
	var xcen=windowHeight/2
	var ycen=windowHeight/2
	  push()
		  strokeWeight(strokeweight.value())
		  stroke(strokecol.value())
		  translate(xcen,ycen)
			rotate(rot)
				translate(rada,0)
					rotate(rotb)
					point(radc,0)
	  pop()
	  
	rot=rot-(2*Math.PI)/temp		// minus since revolution is clockwise and rotation is anticlockwise. This also needs to take into account, the no. of pet, it seems
	rotb=rotb+(ratio*2*Math.PI)/temp 	// the greater the denominator, the smoother the line
  }
   // if (keyIsPressed===true){saveCanvas('myCanvas', 'jpg')}
   // saveCanvas('myCanvas', 'jpg')
   // if (keyIsPressed===true && keyCode==UP_ARROW){saveCanvas('myCanvas', 'jpg')}
}

function draw(){
	 
	 // if (keyIsPressed===true && keyCode==UP_ARROW){saveCanvas('myCanvas', 'jpg')}
// if (mouseButton == RIGHT){saveCanvas('myCanvas', 'jpg')}
}