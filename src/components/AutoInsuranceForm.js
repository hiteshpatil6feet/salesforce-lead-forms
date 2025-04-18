import React, { useState } from 'react';
import './Forms.css';

const AutoInsuranceForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    zip: '',
    city: '',
    state: '',
    country_code: '',
    state_code: '',
    '00NgK00000xLVV4': '', // Miles Driven Daily
    '00NgK00000xLW2v': '', // Vehicle Manufacturer
    '00NgK00000xLW7l': '', // Vehicle Manufacturing Year
    '00NgK00000xLIhY': '', // Vehicle Model
    '00NgK00000xLVLN': '', // Age (using in Auto form as Driver Age)
    '00NgK00000xLMLK': '', // Coverage Type
    '00NgK00000xLVJl': '' // Acciden
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.first_name) newErrors.first_name = 'First Name is required';
    if (!formData.last_name) newErrors.last_name = 'Last Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.zip) {
      newErrors.zip = 'Zip Code is required';
    } else if (!/^\d{5}$/.test(formData.zip)) {
      newErrors.zip = 'Zip Code must be 5 digits';
    }
    
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData['00NgK00000xLVV4']) newErrors['00NgK00000xLVV4'] = 'Miles Driven Daily is required';
    if (!formData['00NgK00000xLW2v']) newErrors['00NgK00000xLW2v'] = 'Vehicle Manufacturer is required';
    
    if (!formData['00NgK00000xLW7l']) {
      newErrors['00NgK00000xLW7l'] = 'Manufacturing Year is required';
    } else if (
      !/^\d{4}$/.test(formData['00NgK00000xLW7l']) || 
      parseInt(formData['00NgK00000xLW7l']) < 1900 || 
      parseInt(formData['00NgK00000xLW7l']) > new Date().getFullYear() + 1
    ) {
      newErrors['00NgK00000xLW7l'] = 'Please enter a valid year';
    }
    
    if (!formData['00NgK00000xLIhY']) newErrors['00NgK00000xLIhY'] = 'Vehicle Model is required';
    
    if (!formData['00NgK00000xLVLN']) {
      newErrors['00NgK00000xLVLN'] = 'Driver Age is required';
    } else if (parseInt(formData['00NgK00000xLVLN']) < 16 || parseInt(formData['00NgK00000xLVLN']) > 100) {
      newErrors['00NgK00000xLVLN'] = 'Please enter a valid age between 16 and 100';
    }
    
    if (!formData['00NgK00000xLMLK']) newErrors['00NgK00000xLMLK'] = 'Coverage Type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Form is valid, submit to Salesforce
      const form = e.target;
      form.submit();
      //onSubmitSuccess();
    }
  };

  return (
    <div className="form-container">
      <h2>Auto Insurance Lead Form</h2>
      <form 
        action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DgK000000MIhR" 
        method="POST"
        onSubmit={handleSubmit}
      >
        {/* Hidden Salesforce required fields */}
        <input type="hidden" name="oid" value="00DgK000000MIhR" />
        <input type="hidden" name="retURL" value="http://192.168.0.121:3000/thankyou" />
        <input type="hidden" name="lead_source" value="Web" />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first_name">First Name *</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={errors.first_name ? 'error' : ''}
              maxLength="40"
            />
            {errors.first_name && <span className="error-message">{errors.first_name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">Last Name *</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={errors.last_name ? 'error' : ''}
              maxLength="80"
            />
            {errors.last_name && <span className="error-message">{errors.last_name}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            maxLength="80"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            maxLength="40"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country_code">Country</label>
            <select
              id="country_code"
              name="country_code"
              value={formData.country_code}
              onChange={handleChange}
            >
              <option value="">--None--</option>
              <option value="US">United States</option>
              {/* Add more countries as needed */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="state_code">State/Province Code</label>
            <select
              id="state_code"
              name="state_code"
              value={formData.state_code}
              onChange={handleChange}
            >
              <option value="">--None--</option>
              <option value="CA">California</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="NY">New York</option>
              <option value="PA">Pennsylvania</option>
              <option value="IL">Illinois</option>
              <option value="OH">Ohio</option>
              <option value="GA">Georgia</option>
              <option value="NC">North Carolina</option>
              <option value="MI">Michigan</option>
              {/* Add more states as needed */}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="zip">Zip Code *</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className={errors.zip ? 'error' : ''}
              maxLength="20"
            />
            {errors.zip && <span className="error-message">{errors.zip}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? 'error' : ''}
              maxLength="40"
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="state">State/Province (text) *</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={errors.state ? 'error' : ''}
              maxLength="20"
            />
            {errors.state && <span className="error-message">{errors.state}</span>}
          </div>
        </div>

        <div className="form-row">
        <div className="form-group">
          <label htmlFor="00NgK00000xLVV4">Miles Driven Daily *</label>
          <input
            type="number"
            id="00NgK00000xLVV4"
            name="00NgK00000xLVV4"
            value={formData['00NgK00000xLVV4']}
            onChange={handleChange}
            className={errors['00NgK00000xLVV4'] ? 'error' : ''}
            min="0"
          />
          {errors['00NgK00000xLVV4'] && <span className="error-message">{errors['00NgK00000xLVV4']}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="00NgK00000xLW2v">Vehicle Manufacturer *</label>
            <input
              type="text"
              id="00NgK00000xLW2v"
              name="00NgK00000xLW2v"
              value={formData['00NgK00000xLW2v']}
              onChange={handleChange}
              className={errors['00NgK00000xLW2v'] ? 'error' : ''}
              maxLength="100"
            />
            {errors['00NgK00000xLW2v'] && <span className="error-message">{errors['00NgK00000xLW2v']}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="00NgK00000xLW7l">Manufacturing Year *</label>
            <input
              type="number"
              id="00NgK00000xLW7l"
              name="00NgK00000xLW7l"
              value={formData['00NgK00000xLW7l']}
              onChange={handleChange}
              className={errors['00NgK00000xLW7l'] ? 'error' : ''}
              min="1900"
              max={new Date().getFullYear() + 1}
            />
            {errors['00NgK00000xLW7l'] && <span className="error-message">{errors['00NgK00000xLW7l']}</span>}
          </div>
        </div>
        </div>

        <div className="form-group">
          <label htmlFor="00NgK00000xLIhY">Vehicle Model *</label>
          <input
            type="text"
            id="00NgK00000xLIhY"
            name="00NgK00000xLIhY"
            value={formData['00NgK00000xLIhY']}
            onChange={handleChange}
            className={errors['00NgK00000xLIhY'] ? 'error' : ''}
            maxLength="50"
          />
          {errors['00NgK00000xLIhY'] && <span className="error-message">{errors['00NgK00000xLIhY']}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="00NgK00000xLVLN">Driver Age *</label>
          <input
            type="number"
            id="00NgK00000xLVLN"
            name="00NgK00000xLVLN"
            value={formData['00NgK00000xLVLN']}
            onChange={handleChange}
            className={errors['00NgK00000xLVLN'] ? 'error' : ''}
            min="16"
            max="100"
          />
          {errors['00NgK00000xLVLN'] && <span className="error-message">{errors['00NgK00000xLVLN']}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="00NgK00000xLMLK">Coverage Type *</label>
          <select
            id="00NgK00000xLMLK"
            name="00NgK00000xLMLK"
            value={formData['00NgK00000xLMLK']}
            onChange={handleChange}
            className={errors['00NgK00000xLMLK'] ? 'error' : ''}
          >
            <option value="">--None--</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Comprehensive">Comprehensive</option>
            <option value="Full Coverage">Full Coverage</option>
            <option value="Liability Only">Liability Only</option>
            <option value="Collision">Collision</option>
            <option value="Personal Injury Protection">Personal Injury Protection</option>
            <option value="High Deductible">High Deductible</option>
            <option value="Low Deductible">Low Deductible</option>
            <option value="Catastrophic">Catastrophic</option>
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
          {errors['00NgK00000xLMLK'] && <span className="error-message">{errors['00NgK00000xLMLK']}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="00NgK00000xLVJl">Accident History</label>
          <input
            type="text"
            id="00NgK00000xLVJl"
            name="00NgK00000xLVJl"
            value={formData['00NgK00000xLVJl']}
            onChange={handleChange}
            placeholder="Describe any recent accidents"
            maxLength="100"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AutoInsuranceForm;