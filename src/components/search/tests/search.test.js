import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import Loader from "react-loader-spinner";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<SearhButton />', () => {
    // it('renders three <Foo /> components', () => {
    //     const wrapper = shallow(<SearchButton />);
    //     expect(wrapper.find(Loader)).to.have.lengthOf(1);
    // });

    // it('renders an `.icon-star`', () => {
    //     const wrapper = shallow(<MyComponent />);
    //     expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
    // });
    //
    // it('renders children when passed in', () => {
    //     const wrapper = shallow((
    //         <MyComponent>
    //             <div className="unique" />
    //         </MyComponent>
    //     ));
    //     expect(wrapper.contains(<div className="unique" />)).to.equal(true);
    // });
    //
    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    // });
});