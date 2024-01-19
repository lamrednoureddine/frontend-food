import React from 'react'
import classes from './create.module.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useState } from 'react'
import { useSelector } from 'react-redux'


const Create = () => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [review, setReview] = useState("")
  const { token } = useSelector((state) => state.auth)
  const [isCreatedSuccess, setIsCreatedSuccess] = useState(false);

  // type="file", e.target.files[0]
  const onChangeFile = (e) => {
    setImage(e.target.files[0])
  }

  const handleCloseImg = () => {
    setImage('')
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      let filename = null

      if (image) {
        filename = Date.now() + image.name
        formData.append("filename", filename)
        formData.append("image", image)

        await fetch(`http://localhost:5000/upload/image`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          method: "POST",
          body: formData
        })
      }

      // uploading product 
      const res = await fetch(`http://localhost:5000/product`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
          type,
          title,
          desc,
          category,
          img: filename,
          price,
          review
        })
        
      })
      if (res.ok) {
        setIsCreatedSuccess(true);
       
        // Reset form fields
        setType("");
        setTitle("");
        setDesc("");
        setCategory("");
        setImage("");
        setPrice("");
        setReview("");
      
        // Optionally, you can navigate to another page or perform other actions.
      
        // We may also want to automatically hide the success message after a few seconds
        setTimeout(() => setIsCreatedSuccess(false), 5000); // 5 seconds delay
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
      {isCreatedSuccess && (
        <div className={classes.successMessage}>
          Product created successfully!
        </div>
      )}
        <h2 className={classes.title}>Create Product</h2>
        <form onSubmit={handleCreateProduct} encType="multipart/form-data">
          <div className={classes.inputWrapper}>
          <div className={classes.inputWrapper}>
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={type}

                onChange={(e) => setType(e.target.value)}
                className="form-control"
              required>
                <option value="">Select Type</option>
                <option value="sale">Sallé</option>
                <option value="sucre">Sucré</option>
              </select>
            </div>
            <label>Title: </label>
            <input type="text"
              placeholder='Title...'
              className={classes.input}
              onChange={(e) => setTitle(e.target.value)}
            required/>
          </div>
          <div className={classes.inputWrapper}>
            <label>Description: </label>
            <input required type="text"
              placeholder='Description...'
              className={classes.input}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Category: </label>
            <input required type="text"
              placeholder='Category...'
              className={classes.input}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapperImage}>
            <label htmlFor="image" className={classes.labelFileInput}>Image: <span>Upload here</span></label>
            <input type="file"
              id="image"
              placeholder='Image...'
              className={classes.input}
              onChange={onChangeFile}
              style={{ display: 'none' }}
            />
            {image && <p className={classes.imageName}>{image.name} <AiOutlineCloseCircle onClick={handleCloseImg} className={classes.closeIcon} /></p>}
          </div>
          <div className={classes.inputWrapper}>
            <label>Price: </label>
            <input required type="number"
              step={1}
              placeholder='Price...'
              className={classes.input}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={classes.inputWrapper}>
            <label>Review: </label>
            <input required type="number"
              step={0.5}
              min={1}
              max={5}
              placeholder='Review...'
              className={classes.input}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <button type="submit" className={classes.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create