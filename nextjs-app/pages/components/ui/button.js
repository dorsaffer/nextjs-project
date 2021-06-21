import Link from 'next/link';
import classes from './Button.module.css';
export function Button(props) {
  return (
    <Link href={props.link}>
      <a className={classes.btn}>{props.children}</a>
    </Link>
  );
}
