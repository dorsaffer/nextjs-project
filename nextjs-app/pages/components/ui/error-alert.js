import classes from './error-alert.module.css';

export function ErrorAlert(props) {
  return <div className={classes.alert}>{props.children}</div>;
}

