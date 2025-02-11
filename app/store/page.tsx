import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Lightbulb, Zap, Shield } from 'lucide-react';

export const metadata : Metadata = {
  title: 'Store',
  description: 'SkulZ Store hadir sebagai solusi mudah dan lengkap untuk berbagai kebutuhan jasa Anda. Temukan beragam layanan profesional, mulai dari desain grafis, penulisan, pemasaran digital, hingga layanan rumah tangga, semua dalam satu platform.',
  keywords: 'SkulZ Store, jasa, desain grafis, pemasaran digital',
  robots: {
    index: false,
    follow: true,
    noarchive: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
    },
  },
}

const features = [
  {
    icon: Lightbulb,
    title: 'Ide Inovatif',
    description: 'Temukan inspirasi dan kembangkan ide-ide kreatif Anda dengan alat kami.'
  },
  {
    icon: Zap,
    title: 'Kecepatan',
    description: 'Percepat proses pengembangan produk Anda dengan platform kami yang efisien.'
  },
  {
    icon: Shield,
    title: 'Keamanan',
    description: 'Lindungi ide dan data Anda dengan sistem keamanan tingkat lanjut kami.'
  }
]

const testimonials = [
  {
    quote: "Platform ini telah mengubah cara saya mengembangkan produk. Sangat direkomendasikan!",
    author: "Andi Pratama",
    role: "CEO, TechStart",
    imageUrl: "data:image/jpeg;base64,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"
  },
  {
    quote: "Saya tidak pernah merasa lebih produktif dan kreatif sebelumnya. Terima kasih!",
    author: "Siti Rahma",
    role: "Product Designer",
    imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAK8AuwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQMEBQYHAgj/xAA8EAABAwIEAwQIBQMDBQAAAAABAAIDBBEFEiExBkFREyJhkQcyQlJxobHBFCOB0eEzcvAVU2IkJUOC8f/EABsBAAEFAQEAAAAAAAAAAAAAAAUAAQIEBgMH/8QAMBEAAgEDAwIDBgYDAAAAAAAAAAECAwQRBRIhMUFRYYETIjJxkbEUIyQzNMEGofD/2gAMAwEAAhEDEQA/ANxQQQSEBBBBIQEnJKyFt5XgDxTWuxBlMMre/J0Gw+KoPEfGEUDnRwOFRVDfXuR/z4D5LpTpTqvEUQqVI01mTLfiGPMgjc5rmxRjeSQ2sqTi3HEGbLTMfUv995yt8tz5KlYhiFViEnaVU7pOgOw+A2CbN0Fgi1HToR5qPINq30nxDgma7ibFas2NQYme7C3KPPdRMkskrs0j3Pd1cblcDTbRBX404QWIrBSlOUvieQFC56oIWUyISPzQsiTCH9LjOJUgtT1kzW+6XZm+R0VgoON548oxGna8H/yQnK7y5+aqCC41LelU+JHWFepDozY8F4qp6xoEFSyYe1G7R4/z/CrLS1sNSO66zubTovPLHujeHsc5rm7OabEfBWjBeL56csjxEGaMbSt0e349QhlbT5R5p8l+jfJ8T4Nnv5I1A4TjkdRC1/aNlidtIz79FOB1xdpBHK3NDmscMvp56HSCCCYcCCCCQgIIIJCAovFMSFOx7Y3gOaLuedmhKYlXfh2ZIyBKRfX2R1WR8W8QurJXUVHJ/wBM02c4H+of2Xe3oSrS2o41q0aUcsU4l4qfVZqWge5kPtS+1IfDwVVugiWgpUYUo7YoCVKsqksyBsLckYRI2rqQDCUZE53gumRe8lcxOyD3eqqD20ufM0lhoDqJVLjheHf1OWwM9py6LIfd+ZXfZC13nTwXJZGTYPbf4oPO8uJvLmzRUtNs6axGmvpn7nOWH3fmuXQR+y5E+MjY6/Bcg2Sje3EOk2SqaZZ1FzTX0x9jh8T2+zdcFOA49Vw5gd6uiK2urKT21ePMz1//AI84Jzt3ny7+gki++/ijsRuuSjOUZlprhkjhGLVWEVBlpjmjJu+InuuWqcNcQw1kHawEuj2fGTrGVjX/AMTvC8TqMMq21FM63JzCdHt6KpdWkayyviLNvcuk8PoehmPbIwPYbtIuCu1VOGMdiq6Vs8T7wvID2843K1AggWN780BknF4YZTTWUGgggmHAkKmobTQGR5uRsOpS6q3FWLMo6eaV+rKcaD3nf5b5p4xcnhDNpLLKjx5jz4waKCQmeYXmI9hvIfH7KhdPDZd1U8lXO+pkeS+R2ZxPMpNaS3oKjDauvcBV6rqz3M6QQQXc4gSkYHtJJKE6W5oPqty4RVKPV9fkaTQbGNSTrzXC6fMVzX2XM1THTROkcbNbueq5Lw1mnrKt8RVL5iKaM3071uaARjlmouKypQciPxfiGrq5LU8pjhG1jq5RTaurDswnkv8AFO48Mlds35JX/SZfdKtLauhnpzq1Hukx5hfEtXAclSe2ZzDjqPgVa6ephrIBNTOBbzHuqgzUMjNHA+ScYPiE2H1Ic03jJs5vVc501LlFu1vp0ntqcovdkSEMrJo2SRm7HagoO0VY0CaaygnjNskU4GmyQkFnWC0OlXLnF0pdunyMd/kNiqc1XguJdfmEgNDdBEi5myX4bxh2EVrXucTTy2EjfDqtowWtE0YiLgdM0bh7Q/zVeflf/R9jTnR/gnutJT96Inm3mP0+/ghl/b5XtF6hCyrYfs36GsIJKnlE0LZW7OG3RKoQExCqm7CnfITsNFkPpBxEy1EeHsNxGO0k13J28h9VpuPTtYxjHOs0Xe74D/CsKxKqNbXVFS4k9q8uHgL6DyRDTqW6o5PsUr6pthtXcbIAokYRwEHSNcXXV0zeB1Ft4QRPeaOqMO1vzSAkzOJGw2XQKyF1W9tVcz0Swt/w1vGn4dfmFVziKN0l9Gjbqo/D6B9TIZni5eblHVXq6yOlZ6o70is+GUtrWbvuuWdqKt1P2lTb2RxR4Mw5bjdSYwaPLfKFK0cFrabKTZCMmySZXZRcQwJjm3DQqrX4L2ZcQLHfZa1VU/c2VaxSkBaSW7p92GRcUyn4BUmnkdRy+qdW36qccFA4tTug/Nj0dGb6KZoahtXTMlB33+Kaou4U0+tmLpvt9hYG6Sm3uu9tlxJrmvyVjT57LiPnwNrFL2tnNeHP0EroXRILVnnmAJ3hda/D66Crj17NwJHVt9R5JmgotKSwySbTyjf+Hqtk0WVrrscBJH4gqZWcejvES/DIQ43dTSGN39vL5H5LR1mqsNk3HwD1Oe+KkUjjys7HDq9wdYhgiaf7rA/UrH+Vlo3pJm/7cG3/AKlTfyv/AAs4RnTo4pZ8WC76WamA0AiQCIFM6Sc7+zjvzXaa17vy2jqqWoVNlvLHfgJaRSVS7jntz9DinOhHIpZ8mUE8gCmtO76IqxxFNJY6n91lsZZuJT2wbFcBjM0jpju53yV7wynu1psqPgZnDQIonXHNW2mxCupmgyUrso6WU5rLAkZeJa6Wny7pzYAWCiaDGYahupLH+67dSbZA7ZRxgnnIb4muZ3tVD4lQdx2+idV+IMpm2AJKhKmrxGscWxMEYO2Y62SxnqNnwKvjcIjzX15KIwCfsqmSlee6dWqx4vhda5hc5zHA9FUHtkosQikfoM2pU8JxaJUajhVjMtEmmySvmc4Dw+i6e4OjDhzGiRhIzyeBA+X8rlCTjJSXYO1IqcHB91gCJGfWsiW0i8rJ5lKLjJphIFEjSwMW70d1GSvqaVx0kjzD4tP8rZKaQy08b73JaL/FYPwZL2XElNc912Zvm0/wtpoKgspGNvtf6lBNQjitnxC1lLNPHgZv6SHHsKIcjI8nyCoqvfpJYewpDybI4fL+FQ7olYfsIo3n7zAjC5QBVsrHaY4gdAOie3TCvPreCFatLFKK8w7oEfzpy8hGkN2uJ5Jd8fbdy100onauHJTGExCaqa217hZ9vDNPLmm/kNhWVEM0VNSnsw7d9r/VPe3x2nxKamikqZfV7J+ZuV1z0I1/RWccPh2V4jBupKioPw5B7B9xtYrpGa8ARODfci2tkpp3QYgxn4hozBzOY/fqrHhuadgdfbdFNS5osrg0H4BKYJ3WyRnZc314OkehG4u9sAkfINGa3IVOxaXFs9LPFYxSvyuhDrBo5X5/JaE+mFSXEAAps2glhkuWseP+QTweORTjuWDOezxaCjimzzSOLjnYdgL6adU1xxvb0JeWESAXAWpy4fJO0tlY1jTyaq3xJhI/DOyttvyT7/eI7OMFbpJO0oonHXu/Zcw6NeTuXuP0H2SWG6UTY3aFqU2jA5nf9VzYfg24pijt7okCiWutJbqEH5Hn2oQ2XdRebAgiQVgpknw262P0Nv8AeaFr7ZXNbZpsFkHDDS7H6Ec+2B8tVsDIy5oPVBtS+NfIKWPwMq/pLpz/AKaXtH9KpF/gbj9lmi2fjqiNTh9fC1ur4e0b8W2P2WMFWtOlmk14Mr3scVM+Id0LrlBECmdJhXC+ZPkzrOfihGrr8uL8zQaA/wAya8hhRvyyEHc7Kw8OutiMYHO6qxcY6gOGgCn8BmAroXDmbIDJGhi/dkjWsNfeNoOyk8rA24soKhna1jbKQbMSLEJkUGMsWqhDKGDUkcuScYPD+U4v9pRGJ1EUFW+SoBsWafwjw7HYZYc7S7IOVrEJ0LsSgeIJnNOjT8lItcyXndVwYpS1zHZC7O42DXNIJP6gKRgMkD8r/NMOyXaxobcWUPjkDX0ztBsnragWtdR2LVLfwztfZKTGRl1gHzNHIkBBxs8DouGvu+R55vJKTL8z9EwbhwkOvZuiQvpZBanTn+mj/wB3MNrEcXs/T7IIo0SCuAwnuCYe24jpnWuIw558iPutroKVj6ONz23JB5+Kyf0bU2aqq6sgkMYI2nxcb/YLZ6dnZwRs91oCB38s1seAWs44pEdjkAfGyS3qnKfgVguNUf8Ap+KVVIbgRyWYf+J1HyXomph7eF8R9ofNZF6R8LLeyr2t1Yexm+x+o8lLT6uyptfca8p7obvAoyC5uhdHAUd3TWq13Ti6QmF90L1Zfkp+f9MN6C/1Ml5f2iFq22Nwn2ATf9RGHHVrgfmkaqK/JMqSoNNUtdt1QFLKNBP3J89zYaZ7gAAdk6jqjms4kKNw+pjqKeOaIgh7b7808q4XSRAwus88zyUEVGPHdlViz2Bw62XUeFU5s+MAW30VMqX4zB+XNOCORZ3QfulaeXEo2tbeR4f0maPqQpHaFCU1nJeo6SmgfnYxocNAbXKbV04JIcdDsQVVS/EWnWYR9GiXO4/oP3Urh+HVNhPWVcshPqtOgHkmIzpOHVj2KeU7hM8YkEeHzSP9lhTsgRusDZVzjPEWwUbaVpBLu84eA/n7qI0FmSRT3yZW5W6F3yRU13SX5Jn2he/4qRpmiKFzyNtUmFYPLFwb5vArpcR/0iXbldXWk0z+OvUx2t/zG/JBXKF0SkcBw52KYrT0ouWk5pD0YNz/AJzKvSkoptgqMXJ4Rpno7wwwYVTNkFnTu7Z4ty5fIBaEonAqYMhMmXKPVYOgUss3Um5zcn3DkIqMVFAIuq7xRhkdXTyMlb+VOzI/wPVWJJTRNniMbhcHkVFNp5RJrPDPN2JUU2HVstJMDnjda/Ucj8E1utQ494bfVxGaBl6qnBsP9xnT48x+oWX9dCLGy0NtXVaGe/cDVqLpyx2DXD9XWK4nqoYBmkeGjod00o8SjrKhzWNc0NGhdz1VXU5wdFxzyEdGUo3UXjh5FaiO+6h62EjYKxObm3TCpgzbhZ2MsGsr0t0TvhTiD8CRSVTiIXnun3T+y0igqmS7PBa7nv5LGKqmc12ZugUxwxxI/D5o4aonsD7R9hdXHPKBTbXuyNVnpu0N7XCbigYNmkfAlOcOr454WPa5pa4XBB5KUa6MtaS3dcyUZSj0ZHUtJEx+bIC7qRdP3vyc0p2jGi9hZQuN4tT0FO+WaRrA3qdUhm2+oji2IRUUUk0pGVm2u/gsyxPEJMRrXyvJsXaDwR4vitTjdUT6kDfVZ0HieqOjoy03O6f4epZo03LoKUkJJuQnlRbI2JmmY3SkMYY29kkO/UOdyAsuechJR2xwLn+nZcriqqI6djO1dlzHpdEyZknqODvgtHpko+wSzzyY3W4v8W3jshQm2a40AWm+jzAnQUonmbaoqttPUZy89/JVPg7AnYpWtqahhFHAbuJ9t3u/uttwmkEEed7QHkWA6NUb+449mvUrWlHne/QfRsEbAxgs0CwC7QQQoIAQQQSEM8Qo21MVwPzGjun7LGPSXwtVxtkxPCGO7utVA1uo/wCQ8Oo5fTc7JhiGHtqW5maSAfo74qUZyh8LwRcVLqjx5NIXXLiSRzcblLYM/s65jidHaLUvSD6NnSulr8DhDJhczUewd1LPHw8uhyctkpakMe0skicLgixB6EFNLlYOtKWyal4F1Gu6TlZfdCnk7RgeNiAQliAd1RNWsNERU09xYjRQtTT5OStMrL7qLroLi5Gi6wkUbigpIaYPjmI4VZsDg6Im/ZyDuq1wcfPy2ko33Huv/hV6OgGRvdGyXGHtYwOyNzHbRScosrwtJ+JL1vHlU5nZU1M0O6vdf5BQE0tXisnbVkjpfDl5I2UYzu30UhDHk2FlFyS6HWnbPPvCcNM2NuUAJ7FGOiSYzM/VPBpsubYQhFI4lNmaJGFtr25paSzhYICzfAW18ExJoh+IH27BgOveP0t90vwfw9WcQV3Y05dFTxn86oOzR0Hj4KZw7g+t4lxKOR2anoIm2knI9bXVrep8dh8ltfDPDlLhtFFT08PY0zCSG21eep53Vum8RWDNXzUq8hXhvBYaKlhjjYWwRNsxp3d4lWNEAALAWHgjUm8lXoBBBBIQEEEEhAQsggkIbVdHFUNGYAOAsHBZ3xt6PqDGgZKhnYVdrNq4Rv8A3D2vr4rTURa1zcpALehSEecKnhrFMBhbHWRCWJosJoTmYR9v1t+qaE6jQ6bgL0PVYRHICYbNvu12oKpuNcE0E0lzD+FlOz4SMp/9dlxlS7oL2+pRjFRqL1MndqmtW0GHZXPEOB8QhaX0skU7OWuV3kdPmqni1PLSflTtyv8AduD8wuW1p8hBVqdRe48hMYLNFl2e9M2/shGwg2tfToij78jjeyjksYOQ0CRwA10+i7yrguy1UjXesLfQJXzSEkExtjc7pUKYw7hXFMQZnZGxsX+46QW8hqrNhvA1MxzPx0753naNndb57n5KahJlapeUaXDfPkUOipKitqGw0kL5nnkwX/U9Pir1w/wRlkEuJHtZSbiCPYfE8/p4q9YVw7FTRBsbGU8XuRDU/FTlPTxQAiFgaDv4rrGkl1BdfUqk+IcL/ZH4dhLKcMMrWjIAGsZsB8FLWQQXUGgQQQSEBBBBIR//2Q=="
  }
]

export default function page() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-12">
            Wujudkan Ide Anda Menjadi Kenyataan
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Platform kami membantu Anda mengubah ide-ide kreatif menjadi produk yang sukses. Mulai perjalanan Anda hari ini!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="https://wa.me/628982696987">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full sm:w-auto text-lg">
                Mulai Gratis
              </button>
            </Link>
            <Link href="/home">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg w-full sm:w-auto text-lg">
                Pelajari Lebih Lanjut
              </button>
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[500px] hidden lg:block">
          <Image
            src="/ilustrasi-ide.gif"
            alt="Hero Image"
            className="object-cover rounded-lg w-full h-auto"
            width={0}
            height={0}
            unoptimized
          />
        </div>
      </div>
    </section>

    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">Fitur Unggulan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">Apa Kata Mereka</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">{`“${testimonial.quote}”`}</p> 
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Siap Untuk Memulai?</h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Bergabunglah dengan ribuan kreator lainnya dan mulai wujudkan ide Anda hari ini. Daftar gratis dan nikmati 14 hari uji coba.
      </p>
      <Link href="/login">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
        Daftar Sekarang
      </button>
      </Link>
    </section>
    </div>
  )
}