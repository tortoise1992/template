import React, { Component } from 'react';
import { Card, Switch, Icon } from 'antd';
import './moduleConfigCard.less'

class ModuleConfigCard extends Component {
    render() {
        let checked = this.props.checked!==undefined?this.props.checked:true
        return (
            <Card title={this.props.title} className={"module-card"+(checked?'':' disabled')} 
                extra={(<Switch 
                    size="small"
                    checkedChildren={<Icon type="check" />} 
                    unCheckedChildren={<Icon type="cross" />} 
                    defaultChecked
                    checked={checked}
                    onChange={this.props.onChange} />)}>
                    {this.props.children}
                <div className="module-card-bottom">{this.props.footer}</div>
            </Card>
        )
    }
}

export default ModuleConfigCard;