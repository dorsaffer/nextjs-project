import Link from 'next/link';
import classes from './event-item.module.css';
export function EventItem(props) {
  const { title, image, date, location, id } = props;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = location.replace(',', '\n');
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <img src={'/' + image} alt={title}></img>
      <div className={classes.container}>
        <div className={classes.summary}>
          <h2>{title}</h2>

          <div className={classes.date}>
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
}
