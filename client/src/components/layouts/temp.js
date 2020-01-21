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