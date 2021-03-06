/*
 * Board detail for overview page.
 */

import React from "react";

const BoardDetail = props => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div
                className="card"
                style={{
                    width: "100%",
                    marginBottom: "20px",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
                }}
            >
                <div className="card-img-top" style={{ height: "100px" }}>
                    <table style={{ height: "100%", width: "100%" }}>
                        <tbody>
                            <tr style={{ textAlign: "center", fontSize: "60px" }}>
                                <td className="align-middle">{props.items}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="card-body" style={{ textAlign: "center" }}>
                    <h1 className="card-text">{props.board}</h1>
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;
