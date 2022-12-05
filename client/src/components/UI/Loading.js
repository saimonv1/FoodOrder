import classes from './Loading.module.css';

const Loading = (props) => {
    return <div className={classes["lds-ellipsis"]}><div></div><div></div><div></div><div></div></div>;
};

export default Loading;