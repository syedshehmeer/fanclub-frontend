import { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";

function Meet() {
    const [inCall, setInCall] = useState(false);

    return (
        <>
            <div style={{ height: "100%" }}>
                {inCall ? (
                    <VideoCall setInCall={setInCall} />
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setInCall(true)}
                    >
                        Join Call
                    </Button>
                )}
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br />
        </>
    );
}

export default Meet;
