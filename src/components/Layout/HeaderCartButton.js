import React from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtbIsHighlighted] =
    React.useState(false);

  const cartCtx = React.useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce(
    (currNumber, item) => {
      return currNumber + item.amount;
    },
    0
  );

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;

  React.useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtbIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtbIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
    </button>
  );
};

export default HeaderCartButton;
