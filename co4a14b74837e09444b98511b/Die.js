import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "tomato"
    }
    const classNamei=["dice first-face","dice second-face","dice third-face","fourth-face dice","fifth-face dice","sixth-face dice"]
    
    const rclassName=classNamei[props.value-1];
    

    
        const dots=[]
        if(props.value==4){
                        for(let i=0;i<2;i++){
                            dots.push(  <div className="column">
    <span className="dot"></span>
    <span className="dot"></span>
  </div>)
            }
        }else if(props.value==5){
                        for(let i=0;i<3;i++){
                            dots.push(  i==1?  <div className="column">
    <span className="dot"></span>
  </div>:<div className="column">
    <span className="dot"></span>
    <span className="dot"></span>
  </div>)
            }
        }else if(props.value==6){
            
                                    for(let i=0;i<2;i++){
                            dots.push(  <div className="column">
    <span className="dot"></span>
    <span className="dot"></span>
    <span className="dot"></span>
  </div>)
            }
            

        }else{
            
        
    for(let i=0;i<props.value;i++){
        dots.push(<span className="dot">
  </span>);
    }}
    

    


    
    return (
        <div className={rclassName}
            style={styles}
            onClick={props.holdDice}>
            {dots}
          
            
        </div>
    )
}