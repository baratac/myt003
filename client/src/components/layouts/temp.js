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