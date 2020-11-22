//rec = {
//	top: '25px',
//	left: '96px',
//	width: '64px',
//	height: '96px',
//      children: []
//}

const { Children } = require("react");

function updateStructure(rec1,rec2){
	if(contains(rec1, rec2)){
		const relativeDm = relativeDim(rec1, rec2);
		return {...rec1, Children:[relativeDm]};
	}else if(contains(rec2, rec1)){
		const relativeDm = relativeDim(rec2, rec1);
		return {...rec2, Children:[relativeDm]};
	}
	else{
		return [...rec1];
	}
}
function relativeDim(recA, recB){
		 const recAn = normalize(recA);
		 const recBn = normalize(recB);
		 const result = {
			 children: recB.children
		 }
		 if(recBn.top){
			 result.top = `${recBn.x1 - recAn.x1}px`;
		 }
		 if(recB.left){
			 result.left = `${recBn.y1 - recAn.y1}px`;
		 }
		 if(recB.bottom){
			 result.bottom = `{recAn.x2 - recBn.x2}px`;
		 }
		 if(recB.right){
			 result.right = `{recAn.y2 - recBn.y2}px`;
		 }
		 if(recB.width){
			 result.width = recB.width;
		 }
		 if(recB.height){
			 result.height = recB.height;
		 }
}
function contains(recA, recB){
	  const recAn = normalize(recA);
	  const recBn = normalize(recB);
	  if(recAn.x1 <= recBn.x1 && recAn.y1 <= recBn.y1 && recAn.x2 >= recBn.x2 && recAn.y2 >= recBn.y2){
		  return true;
	  }
	  return false;
}
function normalize(rec){
	return {
		x1 : rec.top ? parseInt(rec.top) : (parseInt(rec.height) + parseInt(rec.bottom)),
		x2 : rec.left ? parseInt(rec.left) : (parseInt(rec.right) + parseInt(rec.width)),
		y1 : rec.bottom ? parseInt(rec.bottom):(parseInt(rec.height) + parseInt(rec.top)),
		y2 : rec.right ? parseInt(rec.right) : (parseInt(rec.width) + parseInt(rec.left))
	}
}

module.exports = updateStructure;
