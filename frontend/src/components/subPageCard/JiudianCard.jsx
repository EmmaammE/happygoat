import React from 'react'
import "./jiudian.css"
import { Icon, message } from "antd";
import { connect } from 'react-redux';
import * as Actions from "../../action/ActionType";
import ajaxhost from '../../ajaxhost';
// import {addToCart,getCartItems, clearCart} from '../../utils/cartOperation';
class JiudianCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: this.props.datas,
      type: this.props.type
    }
    // this.state = {
    //   datas: [
    //     {
    //       "title": "\u8001\u6d0b\u623f",
    //       "img": "https://iq.dxlfile.com/hotel/original/2012-09/20120918150552.jpg-w430h325",
    //       "cast": "\uffe5 4880-9980",
    //       "opinions": [
    //         "\u7279\u8272\u9910\u5385",
    //         "23\u684c",
    //         "\u5362\u6e7e\u533a"
    //       ],
    //       "rooms":
    //         [
    //           {
    //             "name": "1\u5385",
    //             "img": "https://iq.dxlfile.com/hotel/original/2015-03/20150318101057266.jpg-w200h150"
    //           },
    //           {
    //             "name": "\u5305\u573a",
    //             "img": "https://iq.dxlfile.com/hotel/original/2015-03/20150318101196220.jpg-w200h150"
    //           }
    //         ]
    //     },
    //     {
    //       "title": "\u8001\u6d0b\u623f",
    //       "img": "https://iq.dxlfile.com/hotel/original/2012-09/20120918150552.jpg-w430h325",
    //       "cast": "\uffe5 4880-9980",
    //       "opinions": [
    //         "\u7279\u8272\u9910\u5385",
    //         "23\u684c",
    //         "\u5362\u6e7e\u533a"
    //       ],
    //       "rooms":
    //         [
    //           {
    //             "name": "1\u5385",
    //             "img": "https://iq.dxlfile.com/hotel/original/2015-03/20150318101057266.jpg-w200h150"
    //           },
    //           {
    //             "name": "\u5305\u573a",
    //             "img": "https://iq.dxlfile.com/hotel/original/2015-03/20150318101196220.jpg-w200h150"
    //           }
    //         ]
    //     }
    // ]
    // }

    this.addJiudianToCart = this.addJiudianToCart.bind(this);
    this.addSheyingToCart = this.addSheyingToCart.bind(this);
  }

  addJiudianToCart(index) {

    const { datas } = this.state;
    let select = datas[index];
    select.detail = select.cast + " " + select.opinions.join(" ");
    // select.title = ;
    select.price = select.cast;
    select.type = 'jiudian';
    select.href = '/detail/hunyanjiudian/' + encodeURIComponent(select.href).replace(new RegExp("%", "g"), '~')
    console.log(select);
    console.log(this.props);
    message.info("已添加");
    this.props.addproduct(select)

  }

  toDetail = (e,) => {
    e.preventDefault();

  }
  addSheyingToCart(index){
    const { datas } = this.state;
    let select = datas[index];
    select.href = '/detail/hunshasheying/' + encodeURIComponent(select.href).replace(new RegExp("%", "g"), '~');
    select.detail = select.cast + " " + select.tags.join(' ');
    select.price = select.cast;
    select.type = 'sheying';
    message.info('已添加');
    this.props.addproduct(select);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.datas !== this.props.datas) {
      this.setState({
        datas: nextProps.datas
      })
    }
  }
  render() {
    const { datas, type } = this.state;
    if (type === 'jiudian') {
      return (
        <div className="j-container">
          {
            datas.map((item, index) => (
              <div key={index} className="j-column">
                {/* {
              console.log('index',index)
            } */}
                <div className="blog-card">
                  <img src={item["img"]} className="post-image" />
                  <div className="article-details">
                    <h3 className="post-title">
                      <a className='detail' target='_blank'
                      href={ajaxhost + '/detail/hunyanjiudian/' + encodeURIComponent(item['href']).replace(new RegExp("%", "g"), '~')}
                    >{item['title']}</a>
                    </h3>
                    <h3 className="j-cast">{item['cast']}</h3>
                    <div className="post-description j-room">
                      {
                        item['rooms'].map((room, j) => (
                          <div className="room" key={j}>
                            <img src={room['img']} />
                            <p>{room['name']}</p>
                          </div>
                        ))
                      }
                    </div>
                    <p className="post-author">
                      {
                        item['opinions'].map((opinion, i) => (
                          <span key={i}>{opinion}</span>
                        ))
                      }
                      <span className="star"><Icon type="star" theme="outlined" onClick={() => this.addJiudianToCart(index)} /></span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div >
      )
    } else if (type === 'sheying'){
      return (
        <div className="j-container">
          {
            datas.map((item, index) => (
              <div key={index} className="j-column sheying-img">
                <div className="blog-card">
                  <img src={item["img"]} className="post-image" />
                  <div className="article-details">
                    <h3 className="post-title">
                      <a className='detail' target='_blank'
                      href={ajaxhost + '/detail/hunshasheying/' + encodeURIComponent(item['href']).replace(new RegExp("%", "g"), '~')}
                      >{item['title']}</a>
                    </h3>
                    <h3 className="j-cast">{item['cast']}</h3>
                    {/* <div className="post-description j-room"> */}
                      <p>{item['zone']} <br/>套系：{item['taoxi']} 案例：{item['anli']}</p>

                    {/* </div> */}
                    <p className="post-author">
                      {
                        item['tags'].map((opinion, i) => (
                          <span key={i}>{opinion}</span>
                        ))
                      }
                    </p>
                    <p className="star"><Icon type="star" theme="outlined" onClick={() => this.addSheyingToCart(index)} /></p>
                  </div>
                </div>
              </div>
            ))
          }
        </div >
      )
    }
    else {
      return null
    }
  }
}
function mapStateToProps(state) {
  return {
    data: state.data
  }
}
const mapDispatchToProps = dispatch => ({
  addproduct: item => dispatch(Actions.addproduct(item))
})
export default connect(mapStateToProps, mapDispatchToProps)(JiudianCard);