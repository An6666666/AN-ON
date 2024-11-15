function  bracketMatch (inputString){
  var opening=[];
  var isMatched = true;
  var Left = "{([<";
  var Right = "})]>";
  var i=0;
  var symbol = inputString.charAt(i);
 while(isMatched && symbol != ' '){
     //if(symbol == '{' || symbol =='(' || symbol =='['){
       //opening.push(symbol);
    // }
    if(Left.includes(symbol)){
      opening.push(symbol);
    }
     if(Right.includes(symbol)){
      if(opening.length==0){
      isMatched=false;
      }
      else{
           var match = opening.pop();
           isMatched = (symbol == '}' && match=='{') || 
                       (symbol == ')' && match=='(') || 
                       (symbol == ']' && match=='[');
      }
     }
    symbol = inputString.charAt(++i);
 }
 if(opening.length>0 || !isMatched){ 
  return 'unmatched';
 }else{
  return 'matched';
 }
}

console.log(bracketMatch("<{4[8(0)2]}>"));

