const HeadTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="text-3xl md:text-5xl leading-[1.2] mb-4 text-(--light-color) bg-(--primary-color) m-0.5 py-8 px-12 rounded-t-[5px]">
      {title}
    </h1>
  );
};

export default HeadTitle;
