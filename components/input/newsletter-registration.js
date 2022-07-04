import { useRef } from 'react';
import classes from 'components/input/newsletter-registration.module.css';

const NewsletterRegistration = () => {
  const emailInputEmailRef = useRef();

  const registrationHandler = (event) => {
    event.preventDefault();

    fetch('/api/newsletter/', {
      method: 'POST',
      body: JSON.stringify({
        email: emailInputEmailRef.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log('DATA', data));

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInputEmailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
