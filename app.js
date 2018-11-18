import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
    constructor() {
        super()
        this.state = {
            width: 375,
            height: 667,
            src:window.pages[0].url,
            windowWidth: $(window).width(),
            scale: 1,
            left: 0,
            lang: 'en'
        }
        this.setDeviceSize = this.setDeviceSize.bind(this)
        this.navigateTo = this.navigateTo.bind(this)
        this.langConverter = this.langConverter.bind(this)
        this.onLanguageChange = this.onLanguageChange.bind(this)
        $(window).resize(()=>{
            this.setState({
                windowWidth: $(window).width(),
            }, () => {
                this.setDeviceSize(this.state.width, this.state.height)()
            })
        })
    }
    navigateTo(url){
        return () => {
            this.setState({
                src: url
            })
        }
    }
    componentDidMount(){
        this.setDeviceSize(this.state.width, this.state.height)()
    }
    setDeviceSize(width, height) {
        return () => {
            const {windowWidth} = this.state
            if(width && width < 300){
                return;
                // width = 300
            }
            if(height && height < 300){
                return;
                // height = 300
            }
           
            const newWidth = width || this.state.width
            const newHeight = height || this.state.height

            let scale = 1.0
            if(newWidth > windowWidth){
                scale =  1.0 *  windowWidth / width
            }
            this.setState({
                width: newWidth,
                height: newHeight,
                left: (windowWidth - newWidth * scale ) / 2.0,
                scale
            })
            this.width.value = width || this.state.width;
            this.height.value = height || this.state.height;
        }
    }
    onLanguageChange(){
        return ()=>{
            const currentLang = this.state.lang
            let nextLang
            if(currentLang === 'en'){
                nextLang = 'ko'
            }else{
                nextLang = 'en'
            }
            this.setState({
                lang: nextLang
            })
        }
    }
    render() {
        const { width, height, src, scale, left, lang } = this.state
            return (
                <React.Fragment>
                    <button className="p-0 btn" id="lang" onClick={this.onLanguageChange()}><i class="fas fa-language"></i></button>
                    <main class="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" role="main">
                        <h1 class="bd-title" id="content">{window.title[lang]} <span style={{ fontSize: '1.5rem', color: '#e2873b' }}>{this.langConverter('showcase')}</span></h1>
                        {window.link && (
                            <h6><a href={window.link} target="_blank">{this.langConverter('link')}</a></h6>
                        )}
                        <p class="bd-lead d-none d-sm-block">{this.langConverter('info-top')}</p>
                        <p class="bd-lead d-block d-sm-none">{this.langConverter('info-mobile')}</p>
                    </main>
                    <div class="btn-group d-flex justify-content-center pb-4 pb-sm-0" role="group">
                        <button type="button" class="btn btn-secondary d-none d-sm-block" onClick={this.setDeviceSize(375, 667)}><i class="fas fa-mobile-alt"></i></button>
                        <button type="button" class="btn btn-secondary d-none d-sm-block" onClick={this.setDeviceSize(700, 667)}><i class="fas fa-tablet-alt"></i></button>
                        <button type="button" class="btn btn-secondary d-none d-sm-block" onClick={this.setDeviceSize(1200, 667)}><i class="fas fa-desktop"></i></button>
                        <div class="input-group d-none d-sm-inline-flex" style={{width: 'calc(75px + 12rem)'}}>
                            <div class="input-group-prepend">
                                <span class="input-group-text" style={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, background: '#6c757d', color: 'white', border:'#6c757d', borderLeft: '1px solid white'}}>W</span>
                            </div>
                            <input type="text" class="form-control" defaultValue={width} ref={ref=>this.width = ref} style={{border:'1px solid #6c757d', flex: '0 0 6rem', borderRight: 'none'}} type="number" onChange={e => this.setDeviceSize(parseInt(e.target.value), null)()}/>
                            <div class="input-group-prepend">
                                <span class="input-group-text" style={{background: '#6c757d', color: 'white', border:'#6c757d'}}>H</span>
                            </div>
                            <input type="text" class="form-control" defaultValue={height} ref={ref=>this.height = ref}  style={{border:'1px solid #6c757d', flex: '0 0 6rem'}} type="number" onChange={e => this.setDeviceSize(null, parseInt(e.target.value))()}/>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.langConverter('pages')}
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {window.pages.map((item, index) => {
                                    return (
                                        <a key={index} class="dropdown-item" onClick={this.navigateTo(item.url)}>{item.name[this.state.lang]}</a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="d-sm-flex justify-content-center mt-0 mt-sm-4" style={{ position: 'relative' }}>
                        <iframe src={src} width={width} height={height} frameBorder="0" style={{ background: '#ffffff', transform: `scale(${scale})`, width, height, left, transformOrigin: '0 0', position: 'absolute', top: '30px'}}></iframe>
                    </div>
                </React.Fragment>
            );
    }
    langConverter(langId){
        const lang = this.state.lang
        switch(langId){
            case 'link':
                if(lang === 'en'){
                    return 'Website Link'
                }else{
                    return '웹사이트 링크'
                }
            case 'showcase': 
                if(lang === 'en'){
                    return 'Showcase'
                }else{
                    return '미리보기'
                }
            case 'info-top': 
                if(lang === 'en'){
                    return 'You can change device size (responsive design) and nagivate pages.'
                }else{
                    return '디비이스 미리보기 사이즈를 변경하거나 (반응형), 완성된 페이지를 이동할 수 있습니다.'
                }
            case 'info-mobile':
                if(lang === 'en'){
                    return 'Browse on Desktop to change device size (responsive design).'
                }else{
                    return '디바이스 미리보기 사이즈를 변경하려면 데스크탑에서 접속해주세요'
                }
                case 'pages':
                if(lang === 'en'){
                    return 'Pages'
                }else{
                    return '페이지'
                }
        }
    }
}
            
class Container extends React.Component{
    constructor(){
        super()
        this.state={
            loaded: false
        }
    }
    componentDidMount(){
        const targetLoadingTime = 1000
        const startTime = Date.now()
        $.getJSON( `${process.env.NODE_ENV==='development' ? 'http://test.hakko-dev.com': '' }/config.json`, ( data ) => {
            window.title = data.title
            window.pages = data.pages
            window.link = data.link
            const endTime = Date.now()
            if(endTime - startTime < targetLoadingTime){
                setTimeout(()=>{
                    this.setState({
                        loaded: true
                    })
                }, targetLoadingTime - (endTime - startTime))
            }else{
                this.setState({
                    loaded: true
                })
            }
        });
    }
    render(){
        if(this.state.loaded){
            return <App/>
        }else{
            return <React.Fragment>
                <div className="d-flex justify-content-center align-items-center" style={{width: '100vw', height: '100vh', background: 'black'}}>
                    <div className="text-center">
                        <h2 style={{color: 'white'}} className="animated infinite swing">Hakko-dev</h2>
                        <div className="lds-ripple"><div></div><div></div></div>
                    </div>
                </div>
            </React.Fragment>
        }
    }
}
render(<Container />, document.getElementById('root'));