function StatBar({time, correct}) {
    // components for other stuff
    return (
        <div style={{display:'flex', justifyContent:"space-between", marginTop:'15px'}}>
            <h1 style={{color:'#f44e3f', fontSize:"40px", marginTop:'0%'}}>{"time: "+time}</h1>
            <h1 style={{color:'#2c666e', fontSize:"40px", marginTop:'0%'}}>{"correct words: "+correct}</h1>
        </div>
    )
}

export default StatBar
