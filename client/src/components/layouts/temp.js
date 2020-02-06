<Carousel
                    additionalTransfrom={0}
                    arrows={true}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="slide-container"
                    dotListClass=""
                    draggable
                    ssr={false}
                    focusOnSelect={false}
                    infinite
                    itemClass="activity-slide"
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    partialVisible={true}
                    responsive={{
                        desktop: {
                                breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 1,
                            partialVisibilityGutter: 40
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 2,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        }
                    }}
                    deviceType = 'mobile'
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                {props.activities.map((item) => (<ActivityItem item={item} key = { item._id } />))}
                </Carousel>





           <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>


                <Toast
                animation="true"
                show={show[index]}
                onClose={closeComment(index)}
                delay={3000}
                autohide
                key={item._id}>
                    <Toast.Header closeButton="false">
                        <img src={item.userPic} className="rounded mr-2 img-comment" alt="" />
                        <strong className="mr-auto">{item.userName}</strong>
                        <small><ReactTimeAgo date={new Date(item.createdAt)} locale="en"/></small>
                    </Toast.Header>
                    <Toast.Body>
                        <div className="text-left">
                            <textarea 
                            readOnly
                            defaultValue={item.message}
                            className="form-control" 
                            rows="2" 
                            id="comment"></textarea>  
                        </div>
                        <div className="small"> 
                            <Button className="mr-auto" size="sm" variant="link">Update</Button>
                            <Button className="ml-auto" size="sm" variant="link">Delete</Button>
                        </div>
                    </Toast.Body>
                </Toast>


background-color: rgba(180, 210, 219, .55);



<div className="row bg-indigo-100">
                <div className="profile-box col-3 px-2 mx-auto">
                    <div className="d-flex flex-column justify-content-center">
                        <img src={ profileData.pic } className="img-it mx-auto" alt="User Pic" />
                        <small className="mx-auto text-gray-600">{ profileData.name }</small>
                    </div>
                </div>
                <div className="col-9 text-left info-box">
                    <div className="flex-col flex-wrap content-end h-full">
                        <div className="mt-2 mb-1 text-gray-800"> 
                            {props.item.title}  
                        </div>
                        <div>
                            <div className="row text-gray-500">
                                <div className="col small">
                                    Likes: { props.item.rating }
                                </div>
                                <div className="col small">
                                    { props.item.duration }
                                </div>
                                <div className="col small">
                                        Cost: { priceTag }
                                </div>
                            </div>
                        </div>
                        {props.item.hashTags.length > 0 ? 
                            (<div>
                                {props.item.hashTags.map((tag, idx) => (<small key={idx}>#{tag} </small>))}
                            </div>) : null
                        }
                    </div>
                </div>
            </div>