import React from 'react';
import emailjs from 'emailjs-com';



const Cancelation = () => {
  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };
  return (
    <div>
      <form onSubmit={sendEmail}>
        <div className="row pt-5 mx-auto">
          <div className="col-8 form-group mx-auto">
            <input type="text" className="form-control" placeholder="Name"/>

          </div>
        </div>
      </form>
    </div>
  );
};

export default Cancelation;
