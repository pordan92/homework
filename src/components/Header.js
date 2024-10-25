import { Button } from "react-bootstrap"

const Header = ({onClick}) => {

    const clickHandler = () => {
        onClick()
    }

    return (
        <div className="grid row mx-3 mt-3 mb-4 pb-3 border-bottom">
            <div className="col-6 px-0 align-self-end">
                <Button onClick={clickHandler} className="text-primary bg-transparent border-0 fw-normal ps-0">
                    <i className="bi bi-arrow-left pe-2"></i>View all
                </Button>
            </div>
            <div className="col-6 px-0 text-end d-flex justify-content-end position-relative">
                <h3 className="my-0 mx-1 p-1">Financial sector development timeline</h3>
                <div class="bg-primary rounded position-absolute end-0" style={{width: '5px', height: '100%'}}></div>
            </div>
        </div>
    )
}

export default Header;