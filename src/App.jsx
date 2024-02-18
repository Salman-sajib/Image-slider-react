import ImageSlider from './components/ImageSlider';

function App() {
  return (
    <div className='app'>
      <ImageSlider
        url={'https://picsum.photos/v2/list'}
        page={'2'}
        limit={'10'}
      />
    </div>
  );
}

export default App;
