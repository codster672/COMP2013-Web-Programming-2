export default function Card(props){
    return <div className="Card-Component" style={{ textAlign: "left"}}>
        <img src={props.image} alt="" width="180px" />
        <h2>{props.country}</h2>
        <h3 style={{ color: "darkgray" }}>{props.name}</h3>

        <p style={{ color: props.rate >= 4 ? "green" : "red" }}>
        {props.rate} ★
        </p>

        <p>{props.price}</p>
        
    </div>;
}
//prop.sale && "message" if prop is  true message will appear.
//prop.sale || "message" if prop is false message will appear.