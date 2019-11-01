import React, { Component } from 'react'

export default class Ad extends Component {

    componentDidMount(){
        (window.adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-4301359057292170",
            enable_page_level_ads: true
          });
    }
    render() {
        return (
            <div>
              <ins className='adsbygoogle'
                    style={{ display: 'block' }}
                    data-ad-client= 'ca-pub-4301359057292170'
                    data-ad-slot={this.props.slot}
                    data-ad-format= 'auto'
                    data-full-width-responsive="true"
                >
                </ins>  
            </div>
        )
    }
}
