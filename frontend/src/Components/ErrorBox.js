export default function ErrorBox(props) {
   
    const {error,seterror} = props
   
   
   
    return (
        <div className={error ? "d-block" : "d-none"}>
            <div className={`modal fade ${error ? "show" : ""}`} style={{display: error ? "block" : ""}} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger" id="exampleModalLabel">Error</h5>
                        </div>
                        <div className="modal-body">
                            {error}
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => seterror("")} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

                <div onClick={() => seterror("")}></div>
                
        </div>
    )
}