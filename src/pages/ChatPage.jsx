import { useEffect, useState } from "react";
import { auth,db } from "../firebase/config"
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from "firebase/firestore";
import Message from "../components/Message";


const ChatPage = ({room,setRoom}) => {

// koleksiyonun referansını alma
const messagesCol = collection(db,"messages")
const [messages,setMessages] = useState([]);

// filtreleme ayarları oluşturma
const queryOptions = query(messagesCol,
  where("room", "==", room),
  orderBy("createdAt","asc")
);

// mesajı veritabına ekle
  const handleSubmit = async(e) => {
    e.preventDefault();
    const text = e.target[0].value;
// veri tabanına yeni doküman ekler
// 1.ekleme yapacağımız koleksiyonun referansı
// 2.oluşturacağımız dokümanın verileri
    await addDoc(messagesCol, {
      text,
      room,
      author:{
        name:auth.currentUser.displayName,
        uid:auth.currentUser.uid,
        photo:auth.currentUser.photoURL,
      },
      // veritabanının zamanını alıyor > firestore öz.
      createdAt:serverTimestamp(),
    });

    // formu sıfırlar
    e.target.reset();
  };
// verilere abonu ol
  useEffect(() => {
    // anlık olarak koleksiyondaki değişimleri izler
    // koleksiyon her değiştiğinde verdiğimiz fonk. çalıştırır.
    const unsub = onSnapshot(queryOptions,(snapshot) => {

      // geçici olarak mesajları tuttuğumuz dizi
      const tempMsg = [];

      // docs tamamını döndük ve verilerini erişip geçici bir diziye aktardık
      snapshot.docs.forEach((doc) => tempMsg.push(doc.data()));

      // geçici dizideki verileri alıp state'e aktardık
      setMessages(tempMsg);
    })

    // kullanıcı bileşenden ayrılınca aboneliği sonlandır
    return () => unsub();
  },[])
  
  return (
    <div className="chat-page">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)} >Farklı Oda</button>
      </header>
      <main>
        {messages.map((data,i) => (
          <Message data={data} key={i} />
        ))}
      </main> 
      <form onSubmit={handleSubmit} >
        <input type="text" required placeholder="Mesajınızı yazınız" />
        <button>Gönder</button>
      </form>
    </div>
  )
}

export default ChatPage