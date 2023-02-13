// import { Link } from "react-router-dom";
import "./CSS/profile.css";
import React, { useEffect, useReducer, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { user4 } from "./imports";
// --------------------

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
const styles = (theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        align: "right",
    },
    chip: {
        marginRight: theme.spacing.unit,
    },
    section3: {
        margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2
            }px`,
    },
});

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, celebs: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Profile(props, currentId, setCurrentId, setFanID) {
    const params = useParams();
    const { slug } = params;
    const [id, setId] = useState("");
    const [meet, setMeet] = useState("");
    const [celeb, setCeleb] = useState({})
    const [bookedDate, setBookedDate] = useState("");
    const [name, setName] = useState("");
    const [fanid, setFanId] = useState("");
    // const [changeColor, setChangeColor] = useState("");

    const [{ loading, error, celebs }, dispatch] = useReducer(reducer, {
        // celebs: [],
        loading: true,
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });

            try {
                // get data of every individual celeb by slug
                const result = await axios.get(`http://localhost:5000/api/celebs/indi/${slug}`).then((resp) => {
                    setCeleb(resp.data.celebrities);
                    setId(resp.data.celebrities._id)
                    setName(resp.data.celebrities.name)
                    setMeet(resp.data.celebrities.meeting.meet)
                });

                dispatch({ type: "FETCH_SUCCESS", payload: result.data });

            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: err.message });
            }
        };
        fetchData();

    }, [slug]);
    const meeting = celeb.meeting
    // meeting?.map((c) => (
    //   console.log(c.date)
    // ))

    function AvailableDate() {
        const sessions = meeting?.map((items) => {
            function select_meeting() {
                console.log(items)
                setBookedDate(items.date)
            }
            return (

                <>
                    {items.date !== "" ?

                        <Chip
                            size="medium"
                            avatar={<Avatar>D</Avatar>}
                            label={items.date}
                            clickable
                            color="secondary"
                            onClick={select_meeting}
                            variant="outlined"
                            style={{ width: "100%", padding: "20px", marginTop: "10px", backgroundColor: items.date === true ? "lightblue" : "" }}
                        />
                        : ""}

                </>
            );
        });

        return <div>{sessions}</div>;
    }
    const { classes } = props;
    // const [isDisabled, setIsDisabled] = useState(false);

    // // This function is called when the button is clicked the first time
    // const handleClick = () => {
    //   setIsDisabled(true);
    // };
    console.log(bookedDate)

    function book_session() {
        alert(fanid, "Fan id ")
        axios.put(`http://localhost:5000/api/users/${setFanID.slug}`, {
            celeb_name: name,
            booked_slot: bookedDate,
        });

    }
    return (
        <>

            <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                <div
                    style={{
                        margin: "18px 0px",
                        borderBottom: "1px solid grey",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <div>
                            <a href={celeb.image}>
                                <img
                                    style={{
                                        width: "160px",
                                        height: "160px",
                                        borderRadius: "80px",
                                    }}
                                    src={celeb.image || user4}
                                    alt=""
                                />
                            </a>

                        </div>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <h4>{celeb.name}</h4>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "108%",
                            }}
                        >
                            <h6>

                                {celeb.bio}
                            </h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-div" style={{ align: "center", display: 'flex', justifyContent: "center", paddingTop: "40px" }} >
                <Grid item xs={3} style={{ width: "100%", minWidth: "350px" }}>
                    <Item>
                        <div className={classes.root}>
                            <div className={classes.section1}>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h6">
                                            Avalible Sessions
                                        </Typography>
                                    </Grid>
                                    <Grid item></Grid>
                                </Grid>


                                <AvailableDate />
                            </div>
                            <Divider variant="middle" />
                            <div className={classes.section3}>
                                <Link to={"/payment"}>
                                    <Button variant="contained" color="primary" fullWidth onClick={book_session}>
                                        Book Session
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Item>
                </Grid>
            </div>
            {/* <div style={styles.container}>
        <button
          disabled={isDisabled}
          onClick={handleClick}
          // this is the style for the button
          style={isDisabled ? styles.buttonDisabled : styles.button}
        >
          Button
        </button>
      </div> */}
        </>
    );
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);